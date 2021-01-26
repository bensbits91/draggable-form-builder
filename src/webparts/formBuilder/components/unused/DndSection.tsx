import * as React from 'react';

import {
    Droppable,
    Draggable
} from 'react-beautiful-dnd';

import {
    DroppableProvided,
    DroppableStateSnapshot,
    DraggableProvided,
    DraggableStateSnapshot,
} from 'react-beautiful-dnd/src';

import DndColumn from './DndColumn';



import styled from 'styled-components';








// export type Quote = {
//     id: string,
//     content: string,
//     // author: Author,
// };






export const getBackgroundColor = (
    isDraggingOver: boolean,
    isDraggingFrom: boolean,
): string => {
    if (isDraggingOver) {
        return '#eee';
    }
    if (isDraggingFrom) {
        return '#ccc';
    }
    return '#aaa';
};


const Wrapper = styled.div`
  background-color: ${(props) =>
        getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: 12px;
  border: 12px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const scrollContainerHeight: number = 250;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;
  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: 12px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

/* stylelint-disable block-no-empty */
const Container = styled.div``;
/* stylelint-enable */



export interface DndSectionProps {
    // listId?: string,
    // listType?: string,
    // quotes: Quote[],
    title?: string,
    internalScroll?: boolean,
    scrollContainerStyle?: Object,
    isDropDisabled?: boolean,
    isCombineEnabled?: boolean,
    style?: Object,
    // may not be provided - and might be null
    ignoreContainerClipping?: boolean,

    useClone?: boolean,
}




// type QuoteListProps = {
//     quotes: Quote[],
// };

// const InnerQuoteListConst = ((
//     // props: QuoteListProps,
// ) => {
//     return /* props.quotes.map((quote: Quote, index: number) => ( */
//         <Draggable key={1} draggableId={1} index={index}>
//             {(
//                 dragProvided: DraggableProvided,
//                 dragSnapshot: DraggableStateSnapshot,
//             ) => (
//                     <DndColumn
//                         key={1}
//                         // quote={quote}
//                         // isDragging={dragSnapshot.isDragging}
//                         // isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
//                         // provided={dragProvided}
//                     />
//                 )}
//         </Draggable>
//     // ));
// });

type InnerListProps = {
    dropProvided: DroppableProvided,
    // quotes: Quote[],
    title?: string,
};

function InnerList(props: InnerListProps) {
    const { /* quotes,  */dropProvided } = props;
    const title = props.title ? <div>{props.title}</div> : null;

    return (
        <Container>
            {title}
            <DropZone ref={dropProvided.innerRef}>
                {/* {quotes.map((quote: Quote, index: number) => ( */}
                    <Draggable key={1} draggableId={1} index={1}>
                        {(
                            dragProvided: DraggableProvided,
                            dragSnapshot: DraggableStateSnapshot,
                        ) => (
                                <DndColumn
                                    // key={1}
                                    // quote={quote}
                                    // isDragging={dragSnapshot.isDragging}
                                    // isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                                    // provided={dragProvided}
                                />
                            )}
                    </Draggable>
                {/* ))} */}
                {/* <InnerQuoteListConst quotes={quotes} /> */}
                {dropProvided.placeholder}
            </DropZone>
        </Container>
    );
}



export interface DndSectionState {

}

class DndSection extends React.Component<DndSectionProps, DndSectionState> {
    constructor(props: DndSectionProps) {
        super(props);
        this.state = {};
    }
    render() {

        const {
            ignoreContainerClipping,
            internalScroll,
            scrollContainerStyle,
            isDropDisabled,
            isCombineEnabled,
            // listId = 'LIST',
            // listType,
            style,
            // quotes,
            title,
            useClone,
        } = this.props;

        return (
            <Droppable
                droppableId={'SECTION'}
                type={'SECTION'}
                ignoreContainerClipping={ignoreContainerClipping}
                isDropDisabled={isDropDisabled}
                isCombineEnabled={isCombineEnabled}
                renderClone={
                    useClone
                        ? (provided, snapshot, descriptor) => (
                            <DndColumn
                                // quote={quotes[descriptor.source.index]}
                                // provided={provided}
                                // isDragging={snapshot.isDragging}
                                // isClone
                            />
                        )
                        : null
                }
            >
                {(
                    dropProvided: DroppableProvided,
                    dropSnapshot: DroppableStateSnapshot,
                ) => (
                        <Wrapper
                            style={style}
                            isDraggingOver={dropSnapshot.isDraggingOver}
                            isDropDisabled={isDropDisabled}
                            isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                            {...dropProvided.droppableProps}
                        >
                            {internalScroll ? (
                                <ScrollContainer style={scrollContainerStyle}>
                                    <InnerList
                                        // quotes={quotes}
                                        title={title}
                                        dropProvided={dropProvided}
                                    />
                                </ScrollContainer>
                            ) : (
                                    <InnerList
                                        // quotes={quotes}
                                        title={title}
                                        dropProvided={dropProvided}
                                    />
                                )}
                        </Wrapper>
                    )}
            </Droppable>
        );
    }
}

export default DndSection;