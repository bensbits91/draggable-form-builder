import * as React from 'react';

import {
    DropResult,
    DraggableLocation,
    DroppableProvided,
    DragDropContext,
    Droppable
} from 'react-beautiful-dnd';

import reorder, { reorderQuoteMap } from './reorder';

import DndColumn from './DndColumn';


import styled from 'styled-components';





const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: red;
  min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;


export type Quote = {
    id: string,
    content: string,
    // author: Author,
};

export type QuoteMap = {
    [key: string]: Quote[],
};

export interface DndRootProps {
    initial: QuoteMap,
    withScrollableColumns?: boolean,
    isCombineEnabled?: boolean,
    containerHeight?: string,
    useClone?: boolean,
}

export interface DndRootState {
    columns: QuoteMap,
    ordered: string[],
}

class DndRoot extends React.Component<DndRootProps, DndRootState> {
    constructor(props: DndRootProps) {
        super(props);
        this.state = {
            columns: this.props.initial,
            ordered: Object.keys(this.props.initial),
        };
    }

    public boardRef?: HTMLElement;

    onDragEnd = (result: DropResult) => {
        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow: string[] = [...this.state.ordered];
                shallow.splice(result.source.index, 1);
                this.setState({ ordered: shallow });
                return;
            }

            const column: Quote[] = this.state.columns[result.source.droppableId];
            const withQuoteRemoved: Quote[] = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const columns: QuoteMap = {
                ...this.state.columns,
                [result.source.droppableId]: withQuoteRemoved,
            };
            this.setState({ columns });
            return;
        }

        // dropped nowhere
        if (!result.destination) {
            return;
        }

        const source: DraggableLocation = result.source;
        const destination: DraggableLocation = result.destination;

        // did not move anywhere - can bail early
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // reordering column
        if (result.type === 'COLUMN') {
            const ordered: string[] = reorder(
                this.state.ordered,
                source.index,
                destination.index,
            );

            this.setState({
                ordered,
            });

            return;
        }

        const data = reorderQuoteMap({
            quoteMap: this.state.columns,
            source,
            destination,
        });

        this.setState({
            columns: data.quoteMap,
        });
    };


    render() {
        const columns: QuoteMap = this.state.columns;
        const ordered: string[] = this.state.ordered;
        const {
            containerHeight,
            useClone,
            isCombineEnabled,
            withScrollableColumns,
        } = this.props;

        const board = (
            <Droppable
                droppableId="board"
                type="COLUMN"
                direction="horizontal"
                ignoreContainerClipping={Boolean(containerHeight)}
                isCombineEnabled={isCombineEnabled}
            >
                {(provided: DroppableProvided) => (
                    <Container ref={provided.innerRef} {...provided.droppableProps}>
                        {ordered.map((key: string, index: number) => (
                            <DndColumn
                                key={key}
                                index={index}
                                title={key}
                                quotes={columns[key]}
                                isScrollable={withScrollableColumns}
                                isCombineEnabled={isCombineEnabled}
                                useClone={useClone}
                            />
                        ))}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        );

        return (
            <>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {containerHeight ? (
                        <ParentContainer style={{ height: containerHeight }}>{board}</ParentContainer>
                    ) : (
                            board
                        )}
                </DragDropContext>
                {/* <Global
                    styles={css`
                body {
                  background: ${colors.B200};
                }
              `}
                /> */}
            </>
        );

    }
}

export default DndRoot;