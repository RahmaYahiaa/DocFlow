import express from 'express';
import { addDoctor, allDoctors, loginAdmin , adminDashboard ,appintmentsAdmin ,appointmentCancel} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor',upload.single('image'),addDoctor);
adminRouter.post('/login', loginAdmin );
adminRouter.post('/all-doctors', authAdmin , allDoctors );
adminRouter.get('/dashboard' , authAdmin , adminDashboard);
adminRouter.get('/appointments', authAdmin , appintmentsAdmin);
adminRouter.post('/cancel-appointment' , authAdmin , appointmentCancel)


export default adminRouter;