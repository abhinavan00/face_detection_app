import React from "react";
import Logo from "../../components/Logo/Logo";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onInputName = (event) => {
        this.setState({name: event.target.value})
    }

    onInputEmail = (event) => {
       this.setState({email: event.target.value}) 
    }

    onInputPassword = () => {
        this.setState({password: event.target.value})
    }

    onButtonSubmitRegister = () => {
        const {email, name, password} = this.state;
        fetch('/api/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRounteChange('home');
            } else {
                alert("Unable to register");
            }
        })
    }

    render() {
        return (
        <div>
            <article className="br3 ba b--black-10 mv4 w-100 mw6 center shadow-5 bg-light-gray">
            <main className="pa4 black-80">
                <div className="measure center">
                    <div className="pb4" style={{display: "flex", justifyContent: "center"}}>
                        <Logo />
                    </div>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input 
                            className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" name="name"  
                            id="name"
                            onChange={this.onInputName}
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  
                            id="email-address"
                            onChange={this.onInputEmail}                           
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onInputPassword}
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                        className="br3 b ph4 pv2 input-reset ba b--black bg-black white shadow-5 grow pointer f5 dib" 
                        type="submit" 
                        value="Register"
                        onClick={this.onButtonSubmitRegister}
                    />
                    </div>
                </div>
            </main>
            </article>
        </div>
    )
    }
}

export default Register;