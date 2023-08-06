import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { Link } from "react-router-dom"
const Page404 = () =>{
  return(
    <div>
    <ErrorMessage/>
      <img src="../../../public/Girl.jpg" alt="404Girl" />
      <Link style={{'display':'block', 'textAlign' : 'center'}} to="/">Back to reality</Link>
    </div>
  )
}

export default Page404