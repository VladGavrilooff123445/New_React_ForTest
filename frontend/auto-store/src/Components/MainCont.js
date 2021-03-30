import React from 'react'
import InfoTable from './MainComponents/InfoTable'

class MainCont extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div>
              <InfoTable/>
          </div>
        );
    }
}
export default MainCont