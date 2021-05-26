// import React from 'react';
// import styled from 'styled-components';

// const StyledDiv = styled.div`
//   background: red;
// `;

// type RenderComponent = React.ComponentType | 'div';

// type Props<E extends RenderComponent> = {
//   as?: E;
// } & GetRenderComponentProps<E>;

// const Div = <T extends RenderComponent>({
//   as,
//   children,
//   type = 'div',
//   ...props
// }: Props<T>): ReturnType<React.FC<Props<T>>> => (
//   <StyledDiv as={as} type={as ? undefined : type} {...props}>
//     {children}
//   </StyledDiv>
//   );

// export default Div;

import React from 'react';
// import styled from 'styled-components';

interface Props<C extends React.ElementType> {
  /**
   * An override of the default HTML tag.
   * Can also be another React component. 😉
   */
  as?: C;

  children: React.ReactNode;
  fontType?: string;
  fontColor?: string;
  backgroundColor?: string;
}

type GenericElement<C extends React.ElementType> = Props<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof Props<C>>

const Div = <C extends React.ElementType = 'span'>({
  as,
  children,
  ...other
}: GenericElement<C>): JSX.Element => {
  const Component = as || 'span';

  return (
    <Component {...other}>
      {children}
    </Component>
  );
};

export default Div;
