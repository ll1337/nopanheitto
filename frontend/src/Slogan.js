import './Slogan.css';

function Slogan () {
    const sloganData = require('./slogans/slogans.json');
    const sloganCode = Math.floor(Math.random() * sloganData.length);
    const sloganInfo = sloganData[sloganCode];

    return(
        <p className='subtitle' >{sloganInfo}</p>
    );
}

export default Slogan