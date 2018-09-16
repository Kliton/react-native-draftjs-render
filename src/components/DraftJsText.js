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

  var elements = [];
  if (textElements) {
    textElements = loadAttributes({
      text: props.text,
      customStyles: props.customStyles,
      inlineStyles: props.inlineStyles,
      entityRanges: props.entityRanges,
      entityMap: props.entityMap,
      navigate: props.navigate,
      textProps: props.textProps,
      type: props.type,
      tex: props.tex,
    });

    const customStyle = props.customStyles ? props.customStyles[props.type] : undefined;
    const textAlignStyle = { textAlign: props.data['text-align'] };

  
    if (textElements.tex) {
      return (
        <LatexLabel formula={textElements.text}></LatexLabel>
      )
    }


    return (
      <View
      >{
        textElements.map(item => {
          // console.log("Item", item);
            if (item.props.type == "latex"){
              return <LatexLabel formula={item.props.text}></LatexLabel>
            }

            return <Text  style={[defaultStyles[props.type], textAlignStyle, customStyle]}
            {...props.textProps}>{item}</Text>
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
