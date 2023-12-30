import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    margin: 'auto',
    maxWidth: '600px',
  },
  quizTitle: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  questionContainer: {
    marginBottom: theme.spacing(2),
  },
  question: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  dropdown: {
    width: '100%',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  submitButton: {
    marginTop: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  feedback: {
    marginTop: theme.spacing(2),
    color: theme.palette.success.main,
  },
}));

export default useStyles;
