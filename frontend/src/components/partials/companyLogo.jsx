import google from '../../assets/googleLogo.png'
import microsoft from '../../assets/microsoftLogo.png'
import fedx from '../../assets/fedexLogo.png'
import yt from '../../assets/youtubeLogo.png'
import ibm from '../../assets/ibmLogopng.png'

const CompanyLogo = () =>{

    return(
        <>
     <img src={yt} className="w-14 md:w-28 lg:w-32 xl:w-36 sm:w-20  object-contain filter brightness-0 contrast-200 invert "/>
          <img src={microsoft} className="w-14 md:w-28 lg:w-32 xl:w-36 sm:w-20 object-contain filter brightness-0 contrast-200 invert"/>
          <img src={google} className="w-14 md:w-28 lg:w-32 xl:w-36 sm:w-20 object-contain filter brightness-0 contrast-200 invert"/>
          <img src={fedx} className="w-14 md:w-28 lg:w-32 xl:w-36 sm:w-20 object-contain filter brightness-0 contrast-200 invert"/>
          <img src={ibm} className="w-14 md:w-28 lg:w-32 xl:w-36 sm:w-20 object-contain filter brightness-0 contrast-200 invert"/>
        </>
    )
}

export default CompanyLogo;