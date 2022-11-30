import React, {useEffect, useState} from "react";
import './App.css';

function App() {

    const [path, setPath] = useState('')
    const [data, setData] = useState({
        path: "",
        files: []
    })
    useEffect(() => {
        fetch('http://localhost:3000/file').then(res => res.json())
            .then(
                (result) => {
                    setData(result)
                })
            .catch((e) => {
                console.warn(e)
            })
    }, [])
    useEffect(() => {
        if (data.path) {
            let upper = data.path.split('/')
            upper.pop()
            setPath(upper.join('/'))
        }
    }, [data])

    function clickHandler(e) {
        e.preventDefault();
        fetch('http://localhost:3000/file?path=' + e.target.attributes.href.value).then(res => res.json())
            .then(
                (result) => {
                    setData(result)
                })
            .catch((e) => {
                console.warn(e)
            })
    }

    return (
        <div className="main-wrapper">
            <ul>
                <li className={'folder'}>
                    <a key={`item-${data.path}`}
                       href={`${path}`}
                       onClick={(e) => {
                           clickHandler(e)
                       }}>
                        path: {data.path ? data.path : '/'}
                    </a>
                </li>
                {
                    (data.files)
                        ? data.files.map(i => {
                            if (i.dir) return <li key={`item-${i.name}`} className={'folder'}>&#128193;
                                <a key={`item-${i.name}`}
                                   href={`${data.path}/${i.name}`}
                                   onClick={(e) => {
                                       clickHandler(e)
                                   }}>
                                    {i.name}
                                </a>
                            </li>
                            if (!i.dir) return <li key={`item-${i.name}`} className={'file'}>&#128196;{i.name}</li>
                        })
                        : <p>Loading...</p>
                }
            </ul>
        </div>
    );
}

export default App;
