import { login } from '../api/user.js';
import { html} from '../lib.js';
import { createSubmitHandler } from '../util.js';
import { field } from './common.js';

const loginTemplate = (onSubmit,errors,data) => html`<section id="login">
<article>
    <h2>Login</h2>
    <form @submit=${onSubmit} id="loginForm">
        ${errors ? html`<p class="error">${errors.message}</p>`:null}
        ${field({label: 'Username', name:'username',value:data.username,error: errors.username})}
        ${field({label: 'Password', name:'password',type:'password',error: errors.password})}
        <input type="submit" value="Login">
    </form>
</article>
</section>
`
export function loginPage(ctx) {
    update();
    function update(errors = {},data = {}){
        ctx.render(loginTemplate(createSubmitHandler(onSubmit,'username','password'),errors,data));
    }

    
    async function onSubmit(data,event) {
        try {
            if(data.username == '' || data.password == ''){
                throw{
                    message:'Please fill all fields!',
                    errors: {
                        name:true,
                        password:true
                    }
                };
                
            }
            await login(data.username,data.password);
            event.target.reset();
            ctx.updateSession();
            ctx.updateUserNav();
            ctx.page.redirect('/catalog');
        }catch(err) {
            update(err,data)
        }
       
    }
}


