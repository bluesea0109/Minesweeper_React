import {makeStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import {
  createTheme,
  styled,
} from '@mui/material/styles';

export const useAppStyles = makeStyles({
  headText: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 200,
    backgroundColor: '#f5f5f5',
    border: '1px solid #e4e4e4',
    borderRadius: 4,
    textAlign: 'center'
  },
  layout: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    background: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    height: '95%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 2,
    overflow: 'auto',
    width: '100%'
  },
  score: {
    fontSize: 18
  },
  content: {
    flex: 5,
    display: 'flex',
    flexDirection: 'column',
    margin: 30,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  mineContainer: {
    maxWidth: '100%',
    padding: 10
  },
  footer: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  boxes: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #d6d6d6',
    borderRadius: 8,
    height: '200px',
    lineHeight: '200px',
    textAlign: 'center',
    flexGrow: 1,
    '&:hover': {
      backgroundColor: '#ebebeb'
    },
    cursor: 'pointer'
  },
  boxContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    padding: 20,
    maxWidth: 800
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  actionButtons: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #d6d6d6',
    '&:hover': {
      backgroundColor: '#ebebeb'
    },
    padding: '10px 20px',
    color: '#2e2e2e',
    cursor: 'pointer',
    borderRadius: 4
  },
  smile: {
    fontSize: 20,
  },
  sad: {
    fontSize: 20
  },
  cong: {
    fontSize: 38,
    fontFamily: 'sans-serif',
    color: '#4d4d4d'
  },
  lose: {
    fontSize: 38,
    fontFamily: 'sans-serif',
    color: '#ff5c5c'
  }
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const Item = styled(Paper)(({
  theme,
}) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

