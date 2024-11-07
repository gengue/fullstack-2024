import { Router } from 'express';
import { getTours, getTour, getPopularTours, getTourFeedbacks } from '../controllers/tourController';

const router = Router({ mergeParams: true });

router.get('/', getTours);
router.get('/:id', getTour);
router.get('/popular', getPopularTours);
router.get('/:id/feedback', getTourFeedbacks);

export default router;
