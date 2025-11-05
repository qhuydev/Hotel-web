import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Header() {
  return (
    <Box
      sx={{
        backgroundColor: '#222',   // màu đen của header
        height: '48px',            // đúng chiều cao thanh header
        width: '100%',             // chiếm toàn chiều ngang
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
        Huy dz
      </Typography>
    </Box>
  )
}
