import React, { useState } from 'react';
import { loadLists } from '../../services/api'
import { Container } from './styles';
import BoardContext from './context';
import produce from 'immer';
import List from '../List';


const data = loadLists();

export default function Board() {
    const [lists, setList] = useState(data);

    function move(fromList, toList, from, to) {
        setList(produce(lists, draft => {
            const dragged = draft[fromList].cards[from];
            draft[fromList].cards.splice(from, 1);
            draft[toList].cards.splice(to, 0, dragged);

        }))
    }

    return(
        <BoardContext.Provider value={{ lists, move}}>
            <Container>
                {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
            </Container>
        </BoardContext.Provider>
    );
}