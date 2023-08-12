import React, { useState, useEffect, cloneElement, isValidElement } from "react";

const TypeWriter = ({ elements, delay }) => {
  const [typedElements, setTypedElements] = useState(elements);

  const typeText = async (text, i, isFunction = false) => {
    let timerId;
    let newText = '';
    for (let j = 0; j < text.length; j++) {
      await new Promise(resolve => {
        timerId = setTimeout(() => {
          newText += text[j];
          setTypedElements(prevElements => {
            const newElements = [...prevElements];
            newElements[i] = {
              ...newElements[i],
              text: isFunction ? () => newText : newText
            };
            return newElements;
          });
          resolve();
        }, delay);
      });
    }
    return () => clearTimeout(timerId);
  };

  useEffect(() => {
    const typeAll = async () => {
      for (let i = 0; i < typedElements.length; i++) {
        const element = elements[i];

        if (element.children) {
          for (let k = 0; k < element.children.length; k++) {
            const child = element.children[k];
            if (typeof child.text === 'function') {
              await typeText(child.text().props.children, i, true);
            } else {
              await typeText(child.text, i);
            }
          }
        } else {
          if (typeof element.text === 'function') {
            await typeText(element.text().props.children, i, true);
          } else {
            await typeText(element.text, i);
          }
        }
      }
    };

    typeAll();
  }, [elements, delay]);

  return (
    <div>
      {typedElements.map((element, index) => {
        if (element.children) {
          return React.createElement(
            element.tag,
            { key: index, className: element.className },
            element.children.map((child, childIndex) =>
              React.createElement(
                child.tag,
                { key: childIndex, className: child.className },
                typeof child.text === 'function' ? child.text() : child.text
              )
            )
          );
        }
        return React.createElement(
          element.tag,
          { key: index, className: element.className },
          typeof element.text === 'function' ? element.text() : element.text
        );
      })}
    </div>
  );
};

export default TypeWriter;

