import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import ItemForm from '@/components/ItemForm';
import { TextField, Button, Typography, Container, Dialog, DialogTitle, DialogContent } from '@material-ui/core';


function Auth() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const logout = async () => {
    await auth.signOut();
  }

  const handleForgotPassword = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      console.log(`Email sent to ${email}`);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signUp = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp){
      signUp(email, password);
    } else {
      signIn(email, password);
    }
  }

  if (!user) {
    return (
      <Container component="main" maxWidth="xs" className='form-control' sx={{ m: 2 }}>
        <div style={{ marginTop: '8%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
          <Typography component="h1" variant="h5">
            {isSignUp ? 'Registro' : 'Inicio de sesión'}
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '8%' }}>
            <TextField 
              variant="outlined" 
              margin="normal" 
              required 
              fullWidth 
              id="email" 
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              sx={{ bgcolor: 'primary.main' }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" color = "warning.main" style={{ marginTop: '16px', marginBottom: '8px' }}>
              {isSignUp ? 'Registrarse' : 'Iniciar sesión'}
            </Button>
            <Button onClick={() => setIsSignUp(!isSignUp)} color="primary">
              {isSignUp ? '¿Ya tienes una cuenta? Iniciar sesión' : '¿No tienes una cuenta? Registrarse'}
            </Button>
            {!isSignUp && (
              <Button onClick={() => handleForgotPassword(email)} color="secondary" >
                Olvidé mi contraseña
              </Button>
            )}
          </form>
          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Restablecimiento de contraseña</DialogTitle>
            <DialogContent>
              Hemos enviado un correo electrónico a {email} con instrucciones para restablecer tu contraseña.
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    );
  }

  return (
    <>
      <ItemForm/>
      
    </>
      
  );
}



export default Auth;
