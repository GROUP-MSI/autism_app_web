import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { HomeRouter } from './routes/HomeRouter'

function App() {

  return (
    <>
      <Routes>
        <Route path="/home/*" element={ <HomeRouter /> } />
        {/* <Route path="/customer/*" element={ <PrivateCustomerRoute element={<CustomerRouter/>} /> } />
        <Route path="/worker/*" element={ <PrivateWorkerRoute element={<WorkerRouter/>} /> } />
        <Route path="/admin/*" element={ <PrivateAdminRoute element={<AdminRouter/>} /> } /> */}
        {/* <Route path="*" element={ <RedirectorHome /> } /> */}
      </Routes>
      <ToastContainer autoClose={1300} className="custom-toast-container" />
      {/* <LoadingModal />
      <ModalReport /> */}
    </>
  )
}

export default App
