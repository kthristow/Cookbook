const hostname = 'https://parseapi.back4app.com';


async function request(url,options){
    try{
        const response = await fetch(hostname + url,options);

        if(response.ok == false){
            const error = await response.json();
            throw new Error(error.error);
        }

        return response.json();
    }catch(err){
        alert(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data){
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': '5DdY5DBy0x1kepy4AU7YKpLzWS2JtfQkg9HWrYls',
            'X-Parse-REST-API-Key': 'IgEC7JkCCa7kWReKLeKnH53gY25yUzgTPvrPmQO2'
        }
    }
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    return options;
}


export async function get(url){
    return request(url, createOptions());
}

export async function post(url, data){
    return request(url, createOptions('post',data));
}

export async function put(url, data){
    return request(url, createOptions('put',data));
}

export async function del(url){
    return request(url, createOptions('delete'));
}