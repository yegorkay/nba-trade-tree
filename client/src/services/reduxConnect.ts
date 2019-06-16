import { connect as connectReactRedux } from 'vendor';

export function connect(
  mapStateToProps: any,
  mapDispatchToProps?: any,
  mergeProps?: any,
  options?: any
) {
  return (target: any) =>
    connectReactRedux(mapStateToProps, mapDispatchToProps, mergeProps, options)(
      target
    ) as any;
}
