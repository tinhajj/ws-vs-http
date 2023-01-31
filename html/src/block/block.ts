// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class Block {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Block {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsBlock(bb:flatbuffers.ByteBuffer, obj?:Block):Block {
  return (obj || new Block()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsBlock(bb:flatbuffers.ByteBuffer, obj?:Block):Block {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Block()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

id():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

names(index: number):string
names(index: number,optionalEncoding:flatbuffers.Encoding):string|Uint8Array
names(index: number,optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb!.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
}

namesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startBlock(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addId(builder:flatbuffers.Builder, id:number) {
  builder.addFieldInt32(0, id, 0);
}

static addNames(builder:flatbuffers.Builder, namesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, namesOffset, 0);
}

static createNamesVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startNamesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endBlock(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createBlock(builder:flatbuffers.Builder, id:number, namesOffset:flatbuffers.Offset):flatbuffers.Offset {
  Block.startBlock(builder);
  Block.addId(builder, id);
  Block.addNames(builder, namesOffset);
  return Block.endBlock(builder);
}
}
