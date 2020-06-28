import { ApolloLink, Observable, Operation } from "apollo-link";

const request = async (operation: any) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export default new ApolloLink(
  (operation: Operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);
