import { tasksReducer } from "./tasksReducer";
import { ReducerActionProps, TaskProps } from "./types"

const initialState: TaskProps[] = [
  { id: 1, text: 'Task 1', done: true },
  { id: 2, text: 'Task 2', done: false },
  { id: 3, text: 'Task 3', done: true },
  { id: 4, text: 'Task 4', done: false },
];

describe('tasksReducer', () => {
  let state: TaskProps[] = [];

  beforeEach(() => {
    state = initialState.map(task => ({ ...task }));
  });
  test('should handle the "added" action', () => {
    const action: ReducerActionProps = {
      type: 'added',
      params: {
        id: 5,
        text: 'New Task',
      },
    };

    const newState = tasksReducer(state, action);
    expect(newState).toHaveLength(5);
    expect(newState[0]).toEqual({
      id: 5,
      text: 'New Task',
      done: false
    });
  });

  test('should handle the "text_changed" action', () => {
    const action: ReducerActionProps = {
      type: 'text_changed',
      params: {
        id: 1,
        text: 'Updated Task'
      }
    }

    const newState = tasksReducer(state, action);

    expect(newState[0].text).toBe('Updated Task')
  });

  test('should handle the "updated" action', () => {
    const action: ReducerActionProps = {
      type: 'updated',
      params: {
        id: 1
      }
    }

    const newState = tasksReducer(state, action);

    expect(newState[0].done).toBe(false);
  });

  test('should handle the "deleted" action', () => {
    const action: ReducerActionProps = {
      type: 'deleted',
      params: {
        id: 1,
      }
    }

    const newState = tasksReducer(state, action);

    expect(newState).toHaveLength(3);
  });

  test('should the "refresh" action', () => {
    const action: ReducerActionProps = {
      type: 'refresh',
    };

    const newState = tasksReducer(state, action);

    expect(newState[0].done).toBe(false);
    expect(newState[1].done).toBe(false);
    expect(newState[2].done).toBe(true);
    expect(newState[3].done).toBe(true);
  });

  test('should throw an error for unknown action types', () => {
    const action = { type: 'unknown_action' }

    expect(() => tasksReducer(state, action as any)).toThrow('Unknown action')
  })
});