import { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import Home from './pages/Home/Home';
import ProfileSelect from './components/ProfileSelect/ProfileSelect';
import NetflixIntro from './components/Animations/NetflixIntro';
import SignIn from './components/SIgnIn/SignIn';
import SignUp from './components/SignUp/SignUp';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('netflix-auth') === 'true';
  });
  const [profileSelected, setProfileSelected] = useState(() => {
    return sessionStorage.getItem('netflix-profile') === 'true';
  });
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4300);

    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (showIntro) {
      return <NetflixIntro />;
    }

    if (!isAuthenticated) {
      if (showSignUp) {
        return <SignUp onBackToSignIn={() => setShowSignUp(false)} />;
      }
      return <SignIn
        onSignIn={() => {
          setIsAuthenticated(true);
          sessionStorage.setItem('netflix-auth', 'true');
        }}
        onSignUpClick={() => setShowSignUp(true)}
      />;
    }

    if (!profileSelected) {
      return <ProfileSelect onProfileSelect={(profileId) => {
        setProfileSelected(true);
        sessionStorage.setItem('netflix-profile', 'true');
      }} />;
    }

    return (
      <div className="App">
        <Home />
      </div>
    );
  };

  return (
    <div className="app-container">
      <TransitionGroup>
        <CSSTransition
          key={showIntro ? 'intro' : isAuthenticated ? (profileSelected ? 'home' : 'profile') : (showSignUp ? 'signup' : 'signin')}
          timeout={300}
          classNames="page"
        >
          {renderContent}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
