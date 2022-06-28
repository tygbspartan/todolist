import React, { useState, useEffect } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
  EuiText,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiCard,
  EuiButtonIcon,
} from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';
import { array } from 'joi';
import { async } from 'rxjs/internal/scheduler/async';

interface ToDoListAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const ToDoListApp = ({ basename, notifications, http, navigation }: ToDoListAppDeps) => {
  // Use React hooks to manage state.
  const [timestamp, setTimestamp] = useState<string | undefined>();

  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.
    http.get('/api/to_do_list/example').then((res) => {
      setTimestamp(res.time);
      // Use the core notifications service to display a success message.
      notifications.toasts.addSuccess(
        i18n.translate('toDoList.dataUpdated', {
          defaultMessage: 'Data updated',
        })
      );
    });
  };
  //EXPRESS
  // const URL = 'http://localhost:8000/api';
  
  //HAPI
  const URL = 'http://localhost:5601/ptu/api';

  const [inputText, setInputText] = useState('');

  const [todos, setTodos] = useState([]);

  //GET
  useEffect(() => {
    async function getList() {
      const response = await fetch(`${URL}/to_do_lists`);
      const jsonTodo = await response.json();
      console.log(jsonTodo);
      setTodos(jsonTodo);
    }
    getList();
  }, []);
  
  //Type garne bela onCHange
  const inputTextHandler = (e: any) => {
    setInputText(e.target.value);
  };

  //Create New List
  const submitTodoHandler = async (e : any) => {
    e.preventDefault();

    let smth ={ text: inputText, desc: 'Smile :)', id: Math.random() * 1000 }

    const response = await fetch(`${URL}/to_do_lists`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "kbn-xsrf": 'true'
      },
      body: JSON.stringify(
        smth
      )
    });
    console.log(response)

    // const json = await response.json();
    setTodos([...todos,smth]);
    setInputText("");
  };

  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1200px">
            <EuiPageBody>
              <EuiPageHeader>
                <EuiFlexGroup justifyContent="center">
                  <EuiTitle size="l">
                    <h1>TO-DO LIST</h1>
                  </EuiTitle>
                </EuiFlexGroup>
              </EuiPageHeader>
              <EuiSpacer size="m" />
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiFlexGroup justifyContent="center">
                    <EuiTitle>
                      <h2>↓ Write Here ↓</h2>
                    </EuiTitle>
                  </EuiFlexGroup>
                </EuiPageContentHeader>
                <EuiHorizontalRule />
                <EuiSpacer size="xs" />
                <EuiPageContentBody>
                  <EuiText>
                    <EuiFlexGroup>
                      <EuiFlexItem grow={6}>
                        <EuiFieldText
                          value={inputText}
                          onChange={inputTextHandler}
                          fullWidth={true}
                          placeholder="Add your things to do.."
                        />
                      </EuiFlexItem>

                      <EuiFlexItem grow={1}>
                        <EuiButton type="primary" size="m" onClick={submitTodoHandler}>
                          Add to List
                        </EuiButton>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiText>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
          <EuiPage restrictWidth="1200px">
            <EuiPageBody>
              <EuiPageHeader></EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiTitle>
                    <h3>Your List:</h3>
                  </EuiTitle>
                </EuiPageContentHeader>
                <EuiHorizontalRule />
                <EuiPageContentBody>
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      {todos.map((todo) => (
                        <>
                          <EuiCard
                            key={todo.id}
                            layout="horizontal"
                            title={todo.text}
                            description={todo.desc}
                          >
                            <EuiButtonIcon
                              key={todo.id}
                              onClick={
                                async () =>{
                                  const res = await fetch(`${URL}/to_do_list/${todo.id}`,
                                  {
                                    method: "DELETE",
                                    headers: {
                                      "Content-Type": 'application/json',
                                      "kbn-xsrf": 'true'
                                    },
                                  })
                                  setTodos(todos.filter((el)=> el.id !== todo.id));
                                }

                              }
                              display="base"
                              iconType="trash"
                              aria-label="Delete"
                              color="danger"
                            />
                          </EuiCard>
                          <EuiSpacer size="xs" />
                        </>
                      ))}
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
