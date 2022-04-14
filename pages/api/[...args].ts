import {NextApiRequest, NextApiResponse} from "next";
import {users, tasks} from '../../mock/mock';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {args} = req.query;
    if (args[0] === 'user') {
        res.end(JSON.stringify({data: users}));
    }
    if (args[0] === 'task' && req.method === 'POST') {
        res.end(JSON.stringify({data: tasks}));
    }
}
