import{ Router} from 'express'

const router = Router();

router.get('/', (req, res) => {
  res.json({data: "Hello"});
})

export default router;