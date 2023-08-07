
import FormSignup from './auth/Form/FormSignup';
import  useDocumentTitle  from '../hooks/useDocumentTitle'
import { useNavigate } from 'react-router-dom';


export function SignUpController() {

  useDocumentTitle("Sign up");
  const navigate = useNavigate();
  const navigateSignin = async () =>{ navigate('/');}


  return (
    <>

      <br/><br/><br/><br/>
      <div className="container">
          <div className="row">
              <div className="col-sm-6 mx-auto">
              <h4 className="h4 mb-3 fw-normal">Welcome</h4>
                  <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
                      <FormSignup />
                  <div className="text-center col-12">
                    <a href="#" className="link-primary" onClick={navigateSignin}>Sign in</a>
                  </div>
              </div>
          </div>
      </div>

    </>
 
  );

}

