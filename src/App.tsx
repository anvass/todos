import {
  Box,
  Flex,
  Heading,
  Input,
  Stack,
  StackSeparator,
  VStack,
  CheckboxCard,
  Button,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

type Mode = 'all' | 'active' | 'completed';

const filterTodoItems = (todoItems: TodoItem[], mode: Mode) => {
  return todoItems.filter((todoItem) => {
    if (mode === 'completed') {
      return todoItem.isCompleted;
    }
    if (mode === 'active') {
      return !todoItem.isCompleted;
    }

    if (mode === 'all') {
      return true;
    }

    // return true;
  });
};

function App() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [mode, setMode] = useState<Mode>('all');

  const keyPressInputHandler: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;

      if (target.value) {
        setTodoItems([
          ...todoItems,
          { id: todoItems.length + 1, title: target.value, isCompleted: false },
        ]);

        target.value = '';
      }
    }
  };

  const allClickHandler = () => {
    setMode('all');
  };

  const activeClickHandler = () => {
    setMode('active');
  };

  const completedClickHandler = () => {
    setMode('completed');
  };

  const toggleHandler = (toggleItem: TodoItem) => {
    setTodoItems((prevItems) => {
      return prevItems.map((item) =>
        item === toggleItem
          ? {
              ...item,
              isCompleted: !item.isCompleted,
            }
          : item
      );
    });
  };

  const clearCompletedHandler = () => {
    const onlyActiveItems = todoItems.filter(
      (todoItem) => !todoItem.isCompleted
    );
    onlyActiveItems.map((item, index) => (item.id = index + 1));
    setTodoItems(onlyActiveItems);
  };

  return (
    <>
      <Flex
        direction={'column'}
        justify={'center'}
        alignItems={'center'}
        p={'1.5rem 0.5rem'}
      >
        <VStack separator={<StackSeparator />} w={'full'} maxW={'700px'}>
          <Heading
            as={'h1'}
            size="6xl"
            textTransform={'uppercase'}
            fontWeight={'normal'}
            color={'#e9d9d9'}
          >
            Todos
          </Heading>

          <Stack gap="4" w={'full'}>
            <Input
              placeholder="What needs to be done?"
              size="lg"
              bgColor={'#ffffff'}
              _placeholder={{ fontStyle: 'italic', color: '#e6e6e6' }}
              onKeyDown={keyPressInputHandler}
              type="text"
            />
          </Stack>

          <VStack gap="4" w={'full'}>
            <Flex
              fontSize={'sm'}
              w={'full'}
              direction={{ base: 'column', md: 'row' }}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box mb={{ base: 2, md: 0 }}>
                <Text>{todoItems.length} item(s) left</Text>
              </Box>
              <Box mb={{ base: 2, md: 0 }}>
                <Button onClick={allClickHandler} mr={2} size="xs">
                  All
                </Button>
                <Button onClick={activeClickHandler} mr={2} size="xs">
                  Active
                </Button>
                <Button onClick={completedClickHandler} size="xs">
                  Completed
                </Button>
              </Box>
              <Box>
                <Button onClick={clearCompletedHandler} size="xs">
                  Clear completed
                </Button>
              </Box>
            </Flex>
            <Box w={'full'} className="todoItems">
              {todoItems.length > 0 &&
                filterTodoItems(todoItems, mode).map((todoItem) => {
                  return todoItem.isCompleted ? (
                    <CheckboxCard.Root
                      key={`completed-${todoItem.id}`}
                      display={'flex'}
                      flexDirection={'row'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      colorPalette={'green'}
                      mb={1}
                      onChange={() => toggleHandler(todoItem)}
                      defaultChecked
                    >
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control flex={'none'}>
                        <CheckboxCard.Indicator />
                      </CheckboxCard.Control>
                      <CheckboxCard.Content>
                        <CheckboxCard.Description>
                          {todoItem.title}
                        </CheckboxCard.Description>
                      </CheckboxCard.Content>
                    </CheckboxCard.Root>
                  ) : (
                    <CheckboxCard.Root
                      key={`active-${todoItem.id}`}
                      display={'flex'}
                      flexDirection={'row'}
                      justifyContent={'flex-start'}
                      alignItems={'center'}
                      colorPalette={'green'}
                      mb={1}
                      onChange={() => toggleHandler(todoItem)}
                    >
                      <CheckboxCard.HiddenInput />
                      <CheckboxCard.Control flex={'none'} className="CONTROL">
                        <CheckboxCard.Indicator className="INDICATOR" />
                      </CheckboxCard.Control>
                      <CheckboxCard.Content>
                        <CheckboxCard.Description>
                          {todoItem.title}
                        </CheckboxCard.Description>
                      </CheckboxCard.Content>
                    </CheckboxCard.Root>
                  );
                })}
            </Box>
          </VStack>
        </VStack>
      </Flex>
    </>
  );
}

export default App;
