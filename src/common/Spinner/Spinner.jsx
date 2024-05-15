import ClipLoader from "react-spinners/ClipLoader";
import './Spinner.css';

const override = {
  display: 'block',
  margin: '0 auto',
  borderRadius: '50%',
  border: '0.3em solid red',
  borderRightColor: 'transparent', 
}

function LoadingSpinner ({loading}) {
    return (
        <div className="spinner-container">
          <ClipLoader
          className='spinner'
          color= 'red'
          loading={loading}
          size={150}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
                />
        </div>
    )
}

export default LoadingSpinner;