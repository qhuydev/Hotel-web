import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"
import Room_info from "./components/Appbar/Menus/Room_info"
import Facilities from "./components/Appbar/Menus/Facilities"
import Contact from "./components/Appbar/Menus/Contact"
import Introduce from "./components/Appbar/Menus/Introduce"
import Profiles from "./components/Appbar/Menus/Profiles"




function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{height: '100vh', backgroundColor: 'white'}}>
      <Box sx={{
        backgroundColor: 'white',
        width: '100%',
        height: '78px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
       <Box>
        <Typography sx={{fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          fontSize: '2rem',
          letterSpacing: '2px',
          color: '#d4af37', // vàng ánh kim
          textTransform: 'uppercase',
          marginLeft: '40px'
          }}>
          Huy Hotel
        </Typography>
        </Box> 

       <Box sx={{display: 'flex', alignItems: 'center', gap: 2, justifyContent: "space-between"}}>
        <Room_info />
        <Facilities />
        <Contact />
        <Introduce />
         <Profiles />
       </Box>
      </Box>
      <Box sx={{
         backgroundColor: '#808080',
        width: '100%',
        height: '58px',
        display: 'flex',
        alignItems: 'center'
      }}> ảnh

      </Box>
      <Box>
        Footer
      </Box>

    </Container>
  )
}

export default App
