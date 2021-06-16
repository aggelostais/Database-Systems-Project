import React from 'react';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link'
import HotelIcon from '@material-ui/icons/Hotel';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import RoomIcon from '@material-ui/icons/Room';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
     // this group of buttons will be aligned to the right side
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // this group of buttons will be aligned to the right side
  toolbarButtons: {
    marginLeft: 'auto',
  },
  signButton: {
    margin: 3,
    fontSize:15,
    textTransform:"none",
    fontWeight:"bold",
    "&:hover": {
      background: "#fff",
      color: "#000",
      textTransform: "none"
  }
  },
  homeLink: {
    color: "inherit",
    "&:hover": {
        color: "inherit",
        textDecoration: "none"
    }
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}>

        <MenuIcon />
          </IconButton> 
          <HotelIcon
          width="42px"
          height="42px" 
          style={{marginRight:"30px"}}
        />
       
        {/* Hotel Text*/}
        <Typography variant="h5" noWrap>
          <Link className={classes.homeLink} href="/">
            Hotel Covidmania
          </Link>
        </Typography>


        <div className={classes.toolbarButtons}>
          <Button
             className={classes.signButton}
             variant="contained"
             disabled
             startIcon={<AccountCircleOutlinedIcon />}>
            Guest
          </Button>
        </div>

      </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>


        <Divider/>

        
        <List>
            
            {/* Visit Events */}
            <ListItem 
                button component="a" // to add link in list item
                button key="Visit Events"
                href="/VisitEvents">
              <ListItemIcon>
                  <VisibilityIcon/>
              </ListItemIcon>
              <ListItemText primary="Visit Events"/>
            </ListItem>

            {/* Costumer Trace */}
            <ListItem 
                button component="a" // to add link in list item
                button key="Costumer Trace"
                href="/CostumerTrace">
              <ListItemIcon>
                  <DirectionsRunIcon/>
              </ListItemIcon>
              <ListItemText primary="Costumer Trace"/>
            </ListItem>
            
            {/* Covid Matches */}
            <ListItem 
                button component="a" 
                button key="Covid Matches"
                href="/CovidMatches">
              <ListItemIcon>
                <LocalHospitalIcon/>
              </ListItemIcon>
              <ListItemText primary="Covid Matches"/>
            </ListItem>
        </List>
        
        <Divider/>

        <List>

          {/* Visits per Area*/}
          <ListItem
              button component="a"
              button key="Visits per Area"
              href="/VisitsPerArea">
            <ListItemIcon>
              <RoomIcon/>
            </ListItemIcon>
            <ListItemText primary="Visits per Area"/>
          </ListItem>

            {/* Visits per Service */}
            <ListItem
                button component="a"
                button key="Visits per Service"
                href="/VisitsPerService">
              <ListItemIcon>
                <RoomServiceIcon/>
              </ListItemIcon>
              <ListItemText primary="Visits per Service"/>
            </ListItem>
        </List>

        <Divider/>
        <List>
          
          {/* Costumers per Service */}
          <ListItem
              button component="a" // to add link in list item
              button key="Costumers per Service"
              href="/CostumersPerService">
            <ListItemIcon>
              <AssignmentIndIcon/>
            </ListItemIcon>
            <ListItemText primary="Costumers per Service"/>
          </ListItem>
          
          {/* Sales per Service */}
          <ListItem
              button component="a" // to add link in list item
              button key="Sales per Service"
              href="/SalesPerService">
            <ListItemIcon>
              <AttachMoneyIcon/>
            </ListItemIcon>
            <ListItemText primary="Sales per Service"/>
          </ListItem>

          {/* Costumer Record */}
          <ListItem
              button component="a" // to add link in list item
              button key="Costumer Record"
              href="/CostumerRecord">
            <ListItemIcon>
              <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary="Costumer Record"/>
          </ListItem>

        </List>

      </Drawer>
    </div>
  );
}