import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Index from './pages/Index'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'

function App() {
  const location = useLocation()

  return (
    <>
      <CustomCursor />
      <SmoothScroll />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Index />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
