import {NextApiRequest, NextApiResponse} from "next";
import {users, tasks, comments} from '../../mock/mock';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {args} = req.query;
    if (args[0] === 'user') {
        res.end(JSON.stringify({data: users}));
    }
    if (args[0] === 'task' && req.method === 'POST') {
        res.end(JSON.stringify({data: {tasks, total: 100}}));
    }
    if (args[0] === 'comment' && req.method === 'POST') {
        const {userId, taskId} = JSON.parse(req.body);
        const comm = comments.filter(e => e.userId === userId && e.taskId === taskId);
        res.end(JSON.stringify({data: comm}));
    }
    if (args[0] === 'taskDetail' && req.method === 'POST') {
        const {id} = JSON.parse(req.body);
        const taskDetail = tasks.find(e => +e.id === id);
        res.end(JSON.stringify({data: taskDetail}));
    }
}
