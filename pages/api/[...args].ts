import {NextApiRequest, NextApiResponse} from "next";
import {users, tasks, comments} from '../../mock/mock';

const commRes = {
    code: 0,
    msg: 'ok'
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {args} = req.query;
    if (args[0] === 'login' && req.method === 'POST') {
        res.end(JSON.stringify({...commRes, data: users}));
    }
    if (args[0] === 'task' && req.method === 'POST') {
        res.end(JSON.stringify({...commRes, data: {tasks, total: 100}}));
    }
    if (args[0] === 'comment' && req.method === 'POST') {
        const {userId, taskId} = JSON.parse(req.body);
        const comm = comments.filter(e => e.userId === userId && e.taskId === taskId);
        res.end(JSON.stringify({...commRes, data: comm}));
    }
    if (args[0] === 'taskDetail' && req.method === 'POST') {
        const {id} = JSON.parse(req.body);
        const taskDetail = tasks.find(e => +e.id === id);
        res.end(JSON.stringify({...commRes, data: taskDetail}));
    }
}
