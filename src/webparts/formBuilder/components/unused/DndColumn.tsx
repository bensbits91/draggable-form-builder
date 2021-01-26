// import * as React from 'react';

// import {
//     Draggable,
// } from 'react-beautiful-dnd';

// import {
//     DraggableProvided,
//     DraggableStateSnapshot
// } from 'react-beautiful-dnd/src';

// import DndList from './DndList';

// import styled from 'styled-components';




// const Container = styled.div`
//   margin: 12px;
//   display: flex;
//   flex-direction: column;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-top-left-radius: 6px;
//   border-top-right-radius: 6px;
//   background-color: ${({ isDragging }) =>
//         isDragging ? 'red' : 'green'};
//   transition: background-color 0.2s ease;
//   &:hover {
//     background-color: yellow;
//   }
// `;

// const Title = styled.h4`
//     padding: 12px;
//     transition: background-color ease 0.2s;
//     flex-grow: 1;
//     user-select: none;
//     position: relative;
//     &:focus {
//         outline: 2px solid orange;
//         outline-offset: 2px;
//     }
// `;




// export type Quote = {
//     id: string,
//     content: string,
//     // author: Author,
// };


// export interface DndColumnProps {
//     title: string,
//     quotes: Quote[],
//     index: number,
//     isScrollable?: boolean,
//     isCombineEnabled?: boolean,
//     useClone?: boolean,
// }

// export interface DndColumnState {

// }

// class DndColumn extends React.Component<DndColumnProps, DndColumnState> {
//     constructor(props: DndColumnProps) {
//         super(props);
//         this.state = {};
//     }
//     render() {
//         const title: string = this.props.title;
//         const quotes: Quote[] = this.props.quotes;
//         const index: number = this.props.index;
//         return (
//             <Draggable draggableId={title} index={index}>
//                 {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
//                     <Container ref={provided.innerRef} {...provided.draggableProps}>
//                         <Header isDragging={snapshot.isDragging}>
//                             <Title
//                                 isDragging={snapshot.isDragging}
//                                 {...provided.dragHandleProps}
//                                 aria-label={`${title} quote list`}
//                             >
//                                 {title}
//                             </Title>
//                         </Header>
//                         <DndList
//                             listId={title}
//                             listType="QUOTE"
//                             style={{
//                                 backgroundColor: snapshot.isDragging ? 'aqua' : null,
//                             }}
//                             quotes={quotes}
//                             internalScroll={this.props.isScrollable}
//                             isCombineEnabled={Boolean(this.props.isCombineEnabled)}
//                             useClone={Boolean(this.props.useClone)}
//                         />
//                     </Container>
//                 )}
//             </Draggable>
//         );
//     }

// }

// export default DndColumn;