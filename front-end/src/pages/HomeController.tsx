
import FormSignup from './auth/Form/FormSignup';
import  useDocumentTitle  from '../hooks/useDocumentTitle'
import FormSignin from './auth/Form/FormSignin';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/table/Table';
import Container from 'react-bootstrap/esm/Container';
import { Col, Row } from 'react-bootstrap';

export const data = [
  { id: 1, name: 'John Doe', age: 35},
  { id: 2, name: 'Jane Smith', age: 28},
  { id: 3, name: 'Bob Johnson', age: 42 },
  { id: 4, name: 'Sarah Brown', age: 31},
  { id: 5, name: 'Mike Davis', age: 24},
  { id: 6, name: 'Emily Wilson', age: 39},
  { id: 11, name: 'John Doe', age: 35},
  { id: 21, name: 'Jane Smith', age: 28},
  { id: 31, name: 'Bob Johnson', age: 42},
  { id: 41, name: 'Sarah Brown', age: 31},
  { id: 51, name: 'Mike Davis', age: 24},
  { id: 61, name: 'Emily Wilson', age: 39},
  { id: 12, name: 'John Doe', age: 35},
  { id: 23, name: 'Jane Smith', age: 28},
  { id: 34, name: 'Bob Johnson', age: 42},
  { id: 45, name: 'Sarah Brown', age: 31},
  { id: 56, name: 'Mike Davis', age: 24},
  { id: 67, name: 'Emily Wilson', age: 39},
];

export const header = ["id", "name", "age"];

export function HomeController() {

  useDocumentTitle("Sign in");
  

  const navigate = useNavigate();
  const navigateSingUp = async () =>{ navigate('/signup');}


  return (
    <>

      <br/><br/><br/><br/>
      <div className="container">
          <div className="row">
              <div className="col-sm-6 mx-auto">
                  <h4 className="h4 mb-3 fw-normal">Welcome</h4>
                  <h1 className="h2 mb-3 fw-normal">Please sign in</h1>
                      <FormSignin />
                  <div className="text-center col-12">
                    <a href="#" className="link-primary" onClick={navigateSingUp}>Sign up</a>
                  </div>
              </div>
          </div>
      </div>


      <div style={{ backgroundColor: '#F9F9F9' }}>
      <Container fluid>
        <Row>
          <Col xs={12} sm={6} md={4} lg={4} className="mx-2 my-2 pt-3 pb-2" style={{ backgroundColor: '#FFF' }}>
            <CustomTable
                data={data}
                header={header} 
                selectable={true}></CustomTable>
          </Col>
          <Col xs={12} sm={6} md={4} lg={4} className="mx-2 my-2 pt-3 pb-2" style={{ backgroundColor: '#FFF' }}>
            <CustomTable
                data={data}
                header={header} 
                selectable={true}></CustomTable>
          </Col>
          <Col xs={12} sm={6} md={4} lg={4} className="mx-2 my-2 pt-3 pb-2" style={{ backgroundColor: '#FFF' }}>
            <CustomTable
                data={data}
                header={header} 
                selectable={true}></CustomTable>
          </Col>
          <Col xs={12} sm={6} md={4} lg={6} className="mx-2 my-2 pt-3 pb-2" style={{ backgroundColor: '#FFF' }}>
            <CustomTable
                data={data}
                header={header} 
                selectable={true}></CustomTable>
          </Col>
          <Col xs={12} sm={6} md={4} lg={6} className="mx-2 my-2 pt-3 pb-2" style={{ backgroundColor: '#FFF' }}>
            <CustomTable
                data={data}
                header={header} 
                selectable={true}></CustomTable>
          </Col>
          <Col xs={12} sm={6} md={4} lg={12} className="mx-2 my-2 pt-3 pb-2" style={{ backgroundColor: '#FFF' }}>
            <CustomTable
                data={data}
                header={header} 
                selectable={true}></CustomTable>
          </Col>
        </Row>
      </Container>
    </div>


    </>
 
  );

}

