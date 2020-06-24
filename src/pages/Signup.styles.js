import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'column',
    '& *': {
      fontFamily: 'Architects Daughter',
    },
  },
  card: {
    margin: '20px',
    width: '400px',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  half: {
    width: '50%',
  },
  textField: {
    margin: '20px 0',
  },
  submit: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
