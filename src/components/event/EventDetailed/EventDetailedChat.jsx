import React, { Component } from 'react';
import EventDetailedChatForm from './EventDetailedChatForm';
import { Link } from 'react-router-dom';
import { Segment, Header, Comment } from 'semantic-ui-react';
import distanceInWords from 'date-fns/distance_in_words';

class EventDetailedChat extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null
  };

  handleOpenReplyForm = id => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: id
    });
  };

  handleCloseReplyForm = () => {
    this.setState({
      showReplyForm: false,
      selectedCommentId: null
    });
  };

  render() {
    const { eventId, addEventComment, eventChat } = this.props;

    const { showReplyForm, selectedCommentId } = this.state;

    return (
      <div>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: 'none' }}>
          <Header>Chat about this event</Header>
        </Segment>

        <Segment attached>
          <Comment.Group>
            {eventChat &&
              eventChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar
                    src={comment.photoURL || '/assets/user.png'}
                  />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{distanceInWords(comment.date, Date.now())} ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action
                        onClick={this.handleOpenReplyForm(comment.id)}>
                        Reply
                      </Comment.Action>

                      {showReplyForm && selectedCommentId === comment.id && (
                        <EventDetailedChatForm
                          form={`reply_${comment.id}`}
                          addEventComment={addEventComment}
                          eventId={eventId}
                          closeForm={this.handleCloseReplyForm}
                          parentId={comment.id}
                        />
                      )}
                    </Comment.Actions>
                  </Comment.Content>
                  {comment.childNodes &&
                    comment.childNodes.map(child => (
                      <Comment.Group key={child.id}>
                        <Comment>
                          <Comment.Avatar
                            src={child.photoURL || '/assets/user.png'}
                          />
                          <Comment.Content>
                            <Comment.Author
                              as={Link}
                              to={`/profile/${child.uid}`}>
                              {comment.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>
                                {distanceInWords(child.date, Date.now())} ago
                              </div>
                            </Comment.Metadata>
                            <Comment.Text>{child.text}</Comment.Text>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    ))}
                </Comment>
              ))}
          </Comment.Group>
          <EventDetailedChatForm
            form={'newComment'}
            parentId={0}
            addEventComment={addEventComment}
            eventId={eventId}
          />
        </Segment>
      </div>
    );
  }
}

export default EventDetailedChat;
