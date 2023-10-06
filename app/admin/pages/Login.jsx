import { useState } from 'react';
import styles from '../styles/login.module.scss'
import SquareBtn from '../../components/UI/buttons/SquareLightBtn';
import Input from '../UI/Input';
import login from '../services/adminServices/login';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter()
    const [data,setData] = useState({username:'',password:''})

    const inputsHandler = (name,value) => {
        setData({...data,[name]:value})
    }

    const signIn = async (event) => {
        event.preventDefault()
        const {success,admin} = await login(data)
        if(success){
            router.push('/admin')
        }else{
            alert("Username or password is incorrect")
        }
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={signIn} className={styles.body}>
                <Input 
                handler={inputsHandler}
                value={data.username}
                placeholder='admin'
                label={'Username'} 
                name={'username'}
                />
                <Input
                autocomplete={false}
                handler={inputsHandler}
                value={data.password}
                placeholder='************'
                name={'password'}
                type={'password'}
                label={'Password'}
                />
                <SquareBtn 
                width={'300'}
                text={'Login'}
                />
            </form>
        </div>
    );
}

export default Login;
