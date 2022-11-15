function ErrorBlock(errorObj: any) {
  return <div className="ErrorBlock">Error Occured :: {errorObj.message}</div>;
}

export default ErrorBlock;
