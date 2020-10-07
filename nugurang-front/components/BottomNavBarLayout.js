import { makeStyles } from '@material-ui/core/styles';
import BottomNavBar from './BottomNavBar'

const BottomNavBarLayout = props => (
  <div>
    {props.children}
    <BottomNavBar />
  </div>
)

export default BottomNavBarLayout