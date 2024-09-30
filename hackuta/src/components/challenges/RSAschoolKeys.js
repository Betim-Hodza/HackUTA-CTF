import React, { useState } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';

const RSAschoolKeys = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { question, completed, markAsCompleted } = useCTFQuestion('RSAschoolKeys');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question) {
            setMessage('Error: Question data is not available. Please try again later.');
            return;
        }

        if (completed) {
            setMessage('You have already completed this question.');
            return;
        }

        if (input.trim().toLowerCase() === question.answer.toLowerCase()) {
            try {
                await markAsCompleted();
                setMessage(`Congratulations! You solved the challenge and earned ${question.points} points.`);
            } catch (err) {
                setMessage('Error updating progress. Please try again.');
            }
        } else {
            setMessage('Incorrect. Please try again.');
        }
    };

    const codeSnippet = `
    e1: 65337

    e2: 1025

    n:  9898006990106761218958704658710438961938455299249569101290176615616410703408375450615820327195806122056362055753664487287068998094073625598985651460220475453380335227872574333095873026168614841057396097519402965668738857188695584597802790349329807487586188032298620333018907465828271766535475075563205191984443474832294576571812250800655622240902316593435167816955058584134951063830313429575428033010210526750638640061662297846820870398971586246417988111669774848929555691982565192058055214990432406824510235505526662040303123282851243233720998671320980669567550583251909427933495110842475221911437553291828805689577

    c1:  8876427863578423422090437995387600185352379565384165454676762492350583378171032945676911321733689375795952023730561686906580251027687418088279932032198712532930134087720525853337044646485820854680718340528027722695852614924350433579522644636642948640355327826068033897885473235609352789044653132123217068503347144804741126094802184951459317972015737600705137661834541621061451002118438056249746391603233715485710767247340813089822188951242701468232972906207690088401482719429830198540198535737157693263141277105397053173409848269895085802215878533513081874337098066590788562838678245502140967306899376785283356233819

    c2:  3874365421971261258200567506113137346367777788189537834452184378069688599052461669084797277592930169435911687549292813746849860275762878726544610551724796753199309527356644754349143522290222270359408762533482099638337468928885346554542356351366343002011002399701782577763954916644473921307660449486091104610470457419980060553622590146873437179104234794685993852965046747391635079414510041812914571028219096649208046992154710671760005470055901189568161439860293400808314767108229475681863244781932722835713673302946392503762846683509427392390674082965354770777185893407670702019224439045899074994123205001936181690249

`;

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">RSA School Keys</h1>
            <p className="mb-4">
                These numbers from the school library are raising eyebrows. 
                <br></br> 
                I found two sets of public keys, e1 and n, hidden in Bob's textbook, and e2 and n in Alice's notebook. 
                <br></br>
                Then, I stumbled upon two encrypted messages, c1 and c2, left behind in the computer lab. 
                <br></br>
                Could my classmates be up to something mysterious?
            </p>
            <pre className="bg-gray-100 p-3 rounded mb-4 break-words whitespace-pre-wrap">
                {codeSnippet}
            </pre>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Hidden Logic Result: <input type="text" className="border rounded p-2 w-full" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter decoded result" />
                </label>
                <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600">
                    Submit
                </button>
            </form>
            <p className="mt-4 text-red-500">{message}</p>
        </div>
    );
};

export default RSAschoolKeys;
