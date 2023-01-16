class Form {
    items = [];
    metod = 'GET';
    constructor(container, metod, action) {
        this.container = document.querySelector(container);
        this.metod = metod;
        this.action = action;
    }

    additem(item) {
        this.items.push(item);
    }

    render() {
        let formElement = document.createElement('form');
        formElement.setAttribute('metod', this.metod);
        formElement.setAttribute('action', this.action);

        for(let i in this.items) {
            this.items[i].render(formElement);
        }

        this.container.appendChild(formElement);
    }
}

class Input {

    _type = 'text';
    required = false;
    
    constructor(name, label) {
        this.name = name;
        this.label = label;
    }

    get type () {
        return this._type;
    }

    set type(t) {
        if(['text', 'password', 'email', 'submit'].includes(t)){
            this._type = t;
        } else {
            throw new Error(`input "${t}" type doesn't exist.`)
        }
            
    }

    render(formElement) {
        let el = document.createElement('input');
        el.type = this.type;
        el.name = this.name;
        el.placeholder = this.label;
        el.required = this.required;
        formElement.appendChild(el);
    }
    
}

class Button extends Input {
    constructor(label) {
        super('', label);
        this.type = 'submit';
    }

    render(formElement) {
        let el = document.createElement('input');
        el.type = this.type;
        el.value = this.label;
        formElement.appendChild(el);
    }
}

// IMPLEMENTAÇÃO

//FORMULÁRIO
let form = new Form('.formArea', 'Post', 'https://google.com.br');

// EMAIL
let email = new Input("email", 'Digite seu e-mail');
email.type = 'email';
email.required = true;
form.additem(email);

//SENHA
let password = new Input('password', "Digite sua senha");
password.type = 'password';
form.additem(password);

//Botão
let button = new Button('Enviar');
form.additem(button);

form.render();