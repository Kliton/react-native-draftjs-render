/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

// @flow
import React from 'react';
import { Text , View} from 'react-native';

import loadAttributes from '../loadAttributes';

import defaultStyles from './defaultStyles';
import type { DraftJsTextPropsType } from './types';
import LatexLabel from '../../../../MathBridge';

const DraftJsText = (props: DraftJsTextPropsType): any => {
  let textElements = props.text;

  if (textElements) {
    textElements = loadAttributes({
      text: props.text,
      customStyles: props.customStyles,
      inlineStyles: props.inlineStyles,
      entityRanges: props.entityRanges,
      entityMap: props.entityMap,
      navigate: props.navigate,
      textProps: props.textProps,
      type: props.type
    });

    const customStyle = props.customStyles ? props.customStyles[props.type] : undefined;
    const textAlignStyle = { textAlign: props.data['text-align'] };

    return (
      <View style={{ flexDirection:"row", flexWrap: "wrap", alignItems: "center"}}>{
        textElements.map(item => {
          // console.log("Item", item);
           console.log("Item DraftJsText", item);

            if (item && item.props && item.props.type == "latex"){
              return <LatexLabel  formula={item.props.text}></LatexLabel>
            }

            if (item.length > 0) {
              return <Text style={[defaultStyles[props.type], textAlignStyle, customStyle]}>{item + " " }</Text>
            }


            if (!item || !item.props || !item.props.children)
            {
              console.log("Return null")
              return null;
            }

            var splitted = item.props.children.split(" ");
            // console.log("Splitted", splitted);
             var res = splitted.map(text =>  {
              return <Text style={[defaultStyles[props.type], textAlignStyle, customStyle]}
              {...props.textProps}>{text + " " }</Text>
            });

            return res;
            
           
        })
      }
      </View>
    );
  }
  return null;
};

DraftJsText.defaultProps = {
  text: '',
  data: {},
  inlineStyles: [],
  navigate: undefined,
};

export default DraftJsText;
