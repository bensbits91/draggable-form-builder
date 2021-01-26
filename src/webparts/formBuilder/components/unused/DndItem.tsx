import * as React from 'react';

import {
    DraggableProvided
} from 'react-beautiful-dnd/src';

import styled from 'styled-components';



export type Quote = {
    id: string,
    content: string,
    // author: Author,
};


export interface DndItemProps {
    quote: Quote,
    isDragging: boolean,
    provided: DraggableProvided,
    isClone?: boolean,
    isGroupedOver?: boolean,
    style?: Object,
    index?: number,

}



const getBackgroundColor = (
    isDragging: boolean,
    isGroupedOver: boolean,
    // authorColors: AuthorColors,
) => {
    if (isDragging) {
        return 'green';
    }

    if (isGroupedOver) {
        return 'yellow';
    }

    return 'pink';
};

const getBorderColor = (isDragging: boolean/* , authorColors: AuthorColors */) =>
    isDragging ? 'red' : 'transparent';

const imageSize: number = 40;






const CloneBadge = styled.div`
  background: hotpink;
  bottom: 6px;
  border: 2px solid black;
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);
  height: ${imageSize}px;
  width: ${imageSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.a`
  border-radius: 12px;
  border: 2px solid transparent;
  border-color: ${(props) => getBorderColor(props.isDragging)};
  background-color: ${(props) =>
        getBackgroundColor(props.isDragging, props.isGroupedOver)};
  box-shadow: ${({ isDragging }) =>
        isDragging ? `2px 2px 1px gray` : 'none'};
  box-sizing: border-box;
  padding: 12px;
  min-height: ${imageSize}px;
  margin-bottom: 12px;
  user-select: none;

  /* anchor overrides */
  color: red;

  &:hover,
  &:active {
    color: red;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.colors.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: 12px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
`;

const Author = styled.small`
  color: yellow;
  flex-grow: 0;
  margin: 0;
  background-color: white;
  border-radius: 12px;
  font-weight: normal;
  padding: 6px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;




function getStyle(provided: DraggableProvided, style/* : ?Object */) {
    if (!style) {
        return provided.draggableProps.style;
    }

    return {
        ...provided.draggableProps.style,
        ...style,
    };
}








export interface DndItemState {

}

class DndItem extends React.Component<DndItemProps, DndItemState> {
    constructor(props: DndItemProps) {
        super(props);
        this.state = {};
    }
    render() {

        const {
            quote,
            isDragging,
            isGroupedOver,
            provided,
            style,
            isClone,
            index,
        } = this.props;

        return (
            <div
                // href={quote.author.url}
                isDragging={isDragging}
                isGroupedOver={isGroupedOver}
                isClone={isClone}
                // colors={quote.author.colors}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getStyle(provided, style)}
                data-is-dragging={isDragging}
                data-testid={quote.id}
                data-index={index}
            // aria-label={`${quote.author.name} quote ${quote.content}`}
            >
                {/* REAL CONTENT IN THE WORKS */}
                {/* <Avatar src={quote.author.avatarUrl} alt={quote.author.name} /> */}
                {isClone ? <CloneBadge>Clone</CloneBadge> : null}
                <Content>
                    <BlockQuote>{quote.content}</BlockQuote>
                    <Footer>
                        <Author /* colors={quote.author.colors} */>AUTHOR NAME MANUAL BLAH</Author>
                        <QuoteId>id:{quote.id}</QuoteId>
                    </Footer>
                </Content>
            </div>
        );
    }
}

export default DndItem;