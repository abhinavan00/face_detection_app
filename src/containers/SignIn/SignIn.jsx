import React from "react";
import Logo from "../../components/Logo/Logo";

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailInput = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordInput = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onButtonSubmitSignin = () => {
        const {signInEmail, signInPassword} = this.state;
        fetch('https://face-detection-app-api-fb7t.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(res => res.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                alert("Invalid credentials");
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
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  
                                id="email-address"
                                onChange={this.onEmailInput}
                                />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordInput}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            className="br3 b ph4 pv2 input-reset ba b--black bg-black white shadow-5 grow pointer f5 dib" 
                            type="submit" 
                            value="Sign In"
                            onClick={this.onButtonSubmitSignin}
                        />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={() => this.props.onRouteChange('register')} className="f5 link dim black db pointer underline">Register</p>
                        </div>
                    </div>
                </main>
                </article>
            </div>
        )
    }
}

export default SignIn;