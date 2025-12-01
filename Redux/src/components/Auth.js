import classes from './Auth.module.css';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'; 
import { authAction } from './store'; 

const Auth = () => {

//  const isAuth =  useSelector(store=> store.auth.isAuthtication)
const dispatch = useDispatch()

  const loginHandler=(event) =>{
    event.preventDefault();

    dispatch(authAction.login())
  }

  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
