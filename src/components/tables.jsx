import React from 'react';
import faker from 'faker';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';



const useStyles = makeStyles((theme) => ({
	table : {
		minWidth : 650,		
	},
	tableContainer : {
		borderRadius : 15,
		margin : '10px',
		maxWidth: 950
	},
	tableHeaderCell:{
		fontWeight : 'bold',
		backgroundColor : theme.palette.primary.dark,
		color : theme.palette.getContrastText(theme.palette.primary.dark),
	},
	avatar: {
		backgroundColor: theme.palette.primary.dark,
		color : theme.palette.getContrastText(theme.palette.primary.dark),
		margin : '5px'
	},
	rid:{
		margin : '5px'
	},
	names:{
		fontWeight: 'bold',
		color: theme.palette.secondary.dark,
	},
	status : {
		fontWeight: 'bold',
		fontSize : '0.75 rem',
		color : 'white',
		backgroundColor : 'grey',
		borderRadius: 8,
		padding : '3px 10px',
		display : 'inline-block'
	},
}));


let database = [], STATUSES = ['Active', 'Pending', 'Blocked'];

for (let i=0; i<=15; i++){
	database[i]={
		id: i,
		name : faker.name.findName(),
		email : faker.internet.email(),
		phone : faker.phone.phoneNumber(),
		jobTitle : faker.name.jobTitle(),
		company : faker.company.companyName(),
		joinDate : faker.date.past().toLocaleDateString('en-US'),
		status : STATUSES[Math.floor(Math.random() * STATUSES.length)],
	};
}


export default function DataTables() {
 	const classes = useStyles();
 	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event, newPage) => {
    	setPage(newPage);
  	};

 	const handleChangeRowsPerPage = (event) => {
    	setRowsPerPage(+event.target.value);
    	setPage(0);
  	};
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead stickyHeader aria-label="sticky table">
          <TableRow>
	        <TableCell className={classes.tableHeaderCell}>User Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Job Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {database.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.name}>
              <TableCell>
              	<Grid container className={classes.rid}>

              		<Grid item lg={2}>
              			<Avatar alt={row.name} src ={'.'} className={classes.avatar} />
              		</Grid>

              		<Grid item lg = {10}>
                		<Typography className={classes.names}>{row.name}</Typography>
                		<Typography color = 'textSecondary' variant = 'body2'>{row.email}</Typography>
                		<Typography color = 'textSecondary' variant = 'body2'>{row.phone}</Typography>
                	</Grid>

                </Grid>
             </TableCell>
              <TableCell>
              	<Typography color = 'primary' variant = 'subtitle2'>{row.jobTitle}</Typography>
              	<Typography color = 'textSecondary' variant = 'body2'>{row.company}</Typography>
              </TableCell>
              <TableCell>
              	<Typography>{row.joinDate}</Typography>
              </TableCell>
              <TableCell>
              	<Typography className={classes.status}
              	style = {{
              		backgroundColor :
              		((row.status === 'Active' && 'green')||
              		(row.status ==='Pending' && "blue")||
              		(row.status === 'Blocked' && 'orange'))
              	}}
              	>
              		{row.status}
              	</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={database.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    	/>
    	</TableFooter>
      </Table>
    </TableContainer>
      );
}