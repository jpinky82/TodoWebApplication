import { useAuth } from '../../Contexts/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import './Auth.css'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const { currentUser } = useAuth()
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleAuth() {
    logout()
    navigate('/login')
}

  return (
    <span>
        <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
            <img src={currentUser.photoURL} alt={`${currentUser.displayName} Github avatar`} />
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
            <Dropdown.Header id='header'>Hello {!currentUser.displayName ? currentUser.email : currentUser.displayName.split(' ')[0]}!</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item id='menu-item' href="/Profile">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item id='menu-item'>
              <button onClick={() => handleAuth()} className="btn btn-primary">
                Logout
              </button>
            </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    </span>
  );
}

export default Logout;