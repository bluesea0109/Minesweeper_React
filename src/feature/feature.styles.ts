import {makeStyles} from '@mui/styles';

export const useFeatureStyles = makeStyles({
  cell: {
    minWidth: 10,
    minHeight: 10,
    border: 'none',
    borderRadius: 2,
    backgroundColor: "#bfbfbf",
    cursor: 'grab',
  },
  text: {
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'center',
  },
  row: {
    width: '100%',
    gap: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
